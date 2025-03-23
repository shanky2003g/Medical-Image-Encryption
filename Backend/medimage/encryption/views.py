from django.shortcuts import render
from django.http import JsonResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from .apps import encoder, autoencoder  # Import both encoder and autoencoder
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad, unpad
from Crypto.Random import get_random_bytes
import base64
from PIL import Image
import io
import json
from django.views.decorators.csrf import csrf_exempt

# Global variable to store the latent vector
uploaded_image_global = None

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def encrypt_image(request):
    if request.method == 'POST' and request.FILES.get('image'):
        # Save the uploaded image temporarily
        uploaded_image = request.FILES['image']
        file_name = default_storage.save(uploaded_image.name, ContentFile(uploaded_image.read()))
        file_path = default_storage.path(file_name)

        # Preprocess the image
        img = image.load_img(file_path, target_size=(128, 128))
        img_array = image.img_to_array(img)
        img_array = img_array / 255.0  # Normalize
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Clean up the temporary file
        os.remove(file_path)

        # Return the preprocessed image data (or latent vector) to the frontend
        return JsonResponse({
            'image_data': img_array.tolist(),  # Send the image data to the frontend
            'latent_vector': encoder.predict(img_array).flatten().tolist(),  # Send the latent vector
        })
    return JsonResponse({'error': 'No image uploaded'}, status=400)

@csrf_exempt
def encrypt_latent_vector(request):
    if request.method == 'POST':
        # Get the latent vector as a comma-separated string
        latent_vector_str = request.POST.get('latent_vector')

        # Split the string into individual values and convert them to floats
        latent_vector = np.array([float(x) for x in latent_vector_str.split(',')], dtype=np.float32)

        # Convert the latent vector to a byte array
        latent_vector_bytes = latent_vector.tobytes()

        # Generate a 256-bit AES key and a random IV
        key = get_random_bytes(32)  # 256-bit key
        iv = get_random_bytes(16)   # 128-bit IV

        # Encrypt the latent vector using AES in CBC mode
        cipher = AES.new(key, AES.MODE_CBC, iv)
        encrypted_bytes = cipher.encrypt(pad(latent_vector_bytes, AES.block_size))

        # Encode the encrypted bytes and key/IV in base64 for easy transmission
        encrypted_latent_vector = base64.b64encode(encrypted_bytes).decode('utf-8')
        key_base64 = base64.b64encode(key).decode('utf-8')
        iv_base64 = base64.b64encode(iv).decode('utf-8')

        # Return the encrypted latent vector, key, and IV
        return JsonResponse({
            'encrypted_latent_vector': encrypted_latent_vector,
            'key': key_base64,
            'iv': iv_base64,
        })
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def decrypt_latent_vector(request):
    if request.method == 'POST':
        # Get the encrypted latent vector, key, and IV from the request
        encrypted_latent_vector = request.POST.get('encrypted_latent_vector')
        key = request.POST.get('key')
        iv = request.POST.get('iv')

        # Decode the base64-encoded data
        encrypted_bytes = base64.b64decode(encrypted_latent_vector)
        key_bytes = base64.b64decode(key)
        iv_bytes = base64.b64decode(iv)

        # Decrypt the latent vector using AES in CBC mode
        cipher = AES.new(key_bytes, AES.MODE_CBC, iv_bytes)
        decrypted_bytes = unpad(cipher.decrypt(encrypted_bytes), AES.block_size)

        # Reconstruct the latent vector from the decrypted bytes
        decrypted_latent_vector = np.frombuffer(decrypted_bytes, dtype=np.float32)

        # Return the decrypted latent vector
        return JsonResponse({
            'decrypted_latent_vector': decrypted_latent_vector.tolist(),
        })
    return JsonResponse({'error': 'Invalid request method'}, status=400)


@csrf_exempt
def reconstruct_image(request):
    if request.method == 'POST':
        # Get the image data from the request
        image_data_str = request.POST.get('image_data')

        if not image_data_str:
            return JsonResponse({'error': 'No image data found in request.'}, status=400)

        try:
            # Parse the JSON string into a Python list
            image_data = json.loads(image_data_str)

            # Convert the list to a NumPy array
            img_array = np.array(image_data, dtype=np.float32)

            # Ensure the array has the correct shape (1, 128, 128, 3)
            if img_array.shape != (1, 128, 128, 3):
                return JsonResponse({'error': 'Invalid image data shape.'}, status=400)

            # Reconstruct the image using the autoencoder
            reconstructed_image = autoencoder.predict(img_array)

            # Normalize the reconstructed image to the range [0, 255]
            reconstructed_image = (reconstructed_image * 255).astype(np.uint8)

            # Convert the image to a base64-encoded string for display in the front-end
            reconstructed_image = reconstructed_image.reshape(128, 128, 3)  # Reshape to (128, 128, 3)
            image_pil = Image.fromarray(reconstructed_image)

            # Save the image to a byte buffer
            buffer = io.BytesIO()
            image_pil.save(buffer, format="PNG")
            image_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')

            # Return the reconstructed image as a base64-encoded string
            return JsonResponse({
                'reconstructed_image': image_base64,
            })
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'Error processing image data: {str(e)}'}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
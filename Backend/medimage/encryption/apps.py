from django.apps import AppConfig
from tensorflow.keras.models import load_model
import os

class EncryptionConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "encryption"

    def ready(self):
        """
        Load the encoder and autoencoder models when the app is ready.
        """
        global encoder, autoencoder

        # Load the encoder model
        encoder_path = '/Users/shashankgupta/Shashank/Projects/IAS-Project/Backend/medimage/encoder_model.h5'
        if not os.path.exists(encoder_path):
            raise FileNotFoundError(f"Encoder model file not found at: {encoder_path}")
        
        try:
            encoder = load_model(encoder_path)
            print("Encoder model loaded successfully.")
            print("Encoder model summary:")
            encoder.summary()  # Print the model summary to verify
        except Exception as e:
            raise RuntimeError(f"Failed to load the encoder model: {e}")

        # Load the autoencoder model
        autoencoder_path = '/Users/shashankgupta/Shashank/Projects/IAS-Project/Backend/medimage/autoencoder_model.h5'
        if not os.path.exists(autoencoder_path):
            raise FileNotFoundError(f"Autoencoder model file not found at: {autoencoder_path}")
        
        try:
            autoencoder = load_model(autoencoder_path)
            print("Autoencoder model loaded successfully.")
            print("Autoencoder model summary:")
            autoencoder.summary()  # Print the model summary to verify
        except Exception as e:
            raise RuntimeError(f"Failed to load the autoencoder model: {e}")

        print("Encryption app is ready.")
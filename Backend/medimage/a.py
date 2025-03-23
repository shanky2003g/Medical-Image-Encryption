import h5py

# Path to your .h5 model file
model_file_path = 'medimage/encoder_model.h5'

# Open the .h5 file
with h5py.File(model_file_path, 'r') as f:
    # List all keys in the file (this will give you an overview of the structure)
    print("Keys in the .h5 file:")
    print(list(f.keys()))
    
    # To get more information about the layers, weights, and other metadata:
    print("\nDetailed contents of the .h5 file:")
    
    # Explore the datasets (e.g., model weights, architecture, etc.)
    def print_attrs(name, obj):
        """This will print all the attributes of each group/dataset."""
        print(f"{name}: {obj}")

    # Print all the groups and datasets in the h5 file
    f.visititems(print_attrs)

    # Check if model architecture is present
    if 'model_config' in f:
        print("\nModel configuration (architecture):")
        print(f['model_config'][()])
        
    # Check if model weights are present
    if 'model_weights' in f:
        print("\nModel weights:")
        print(f['model_weights'].keys())  # List all keys inside model_weights

    # Check for other metadata
    if 'optimizer_weights' in f:
        print("\nOptimizer weights:")
        print(f['optimizer_weights'].keys())  # List optimizer weights if they exist

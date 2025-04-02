import json
import random
from PIL import Image, ImageDraw

def generate_image(attributes, filename):
    img = Image.new('RGB', (512, 512), (128, 128, 128))  # Base image
    draw = ImageDraw.Draw(img)
    # Simple text representation, in real project use layered images
    text = "\n".join([f"{k}: {v}" for k, v in attributes.items()])
    draw.text((10, 10), text, fill='white')
    img.save(filename)

def generate_metadata():
    traits = {
        "background": ["Graveyard", "City Ruins", "Forest"],
        "skin": ["Pale", "Decayed", "Rotten"],
        "eyes": ["Glowing Red", "Empty Sockets", "Zombie Blue"],
        "accessory": ["Chains", "Top Hat", "Bandages"]
    }

    metadata = []
    for i in range(1, 101):  # Generate for first 100 for testing
        attributes = {}
        attr_list = []
        for trait, options in traits.items():
            value = random.choice(options)
            attributes[trait] = value
            attr_list.append({"trait_type": trait.capitalize(), "value": value})

        generate_image(attributes, f"assets/{i}.png")

        token_metadata = {
            "name": f"Zomboys #{i}",
            "description": "A unique zombie character from the Zomboys collection.",
            "image": f"ipfs://your_ipfs_hash/{i}.png",  # Placeholder
            "attributes": attr_list
        }
        metadata.append(token_metadata)

    with open("metadata.json", "w") as f:
        json.dump(metadata, f, indent=2)

if __name__ == "__main__":
    generate_metadata()
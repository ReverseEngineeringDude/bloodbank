import os
import requests

# Set the target folder where images will be saved
target_folder = "./avatar/female/"
os.makedirs(target_folder, exist_ok=True)

# Loop through image numbers 1 to 50
for i in range(51,101):
    url = f"https://avatar.iran.liara.run/public/{i}"
    filename = f"female{i}.png"
    filepath = os.path.join(target_folder, filename)

    try:
        response = requests.get(url)
        response.raise_for_status()  # Raise error for bad status codes
        with open(filepath, "wb") as f:
            f.write(response.content)
        print(f"Downloaded {filename}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {filename}: {e}")

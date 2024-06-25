from flask import Flask, request, jsonify
import requests
import subprocess

app = Flask(__name__)
app.url_map.strict_slashes = False

@app.route('/procesar', methods=['GET'])
def procesar_imagenes():
    url1 = request.args.get('url1')
    url2 = request.args.get('url2')

    if not url1 or not url2:
        return jsonify({'error': 'Se requieren las URLs de ambas imágenes'})

    # Obtenemos la URL completa de la solicitud
    full_url = request.full_path
    # Extraemos las URLs directamente de la URL completa
    url1_start = full_url.find('url1=') + len('url1=')
    url1_end = full_url.find('&', url1_start)
    url1 = full_url[url1_start:url1_end]

    url2_start = full_url.find('url2=') + len('url2=')
    url2 = full_url[url2_start:]

    print("URL 1 =", url1)
    print("URL 2 =", url2)

    if url1 and url2:
        response1 = requests.get(url1)
        response2 = requests.get(url2)

        with open("image_1.jpeg", "wb") as f:
            f.write(response1.content)

        with open("image_2.jpeg", "wb") as f:
            f.write(response2.content)

        algoritmo()

        with open('resultado.txt', 'r') as f:
            resultado = f.read()

            return jsonify({'resultado': resultado})
    else:
        return jsonify({'error': 'Se requieren las URLs de ambas imágenes'})


def algoritmo():
    subprocess.run(['python', 'algoritmo.py'])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int("3000"), debug=True)
import cv2
from facenet_pytorch import InceptionResnetV1, MTCNN, extract_face
from PIL import Image
import os

# Carga el modelo MTCNN para la detección facial
mtcnn = MTCNN(keep_all=True)

# Carga el modelo InceptionResnetV1 para la extracción de características faciales
resnet = InceptionResnetV1(pretrained='vggface2').eval()

# Carga las imágenes de las caras que quieres comparar
image1 = Image.open('image_1.jpeg')
image2 = Image.open('image_2.jpeg')

# Usa MTCNN para detectar y recortar las caras en las imágenes
boxes1, probs1 = mtcnn.detect(image1)
boxes2, probs2 = mtcnn.detect(image2)

face1 = extract_face(image1, boxes1[0])
face2 = extract_face(image2, boxes2[0])

if boxes1 is None or len(boxes1) == 0:
    resultado = "No se detectaron caras en la 1er imagen"
    with open('resultado.txt', 'w') as archivo:
            # Escribe el texto en el archivo
            archivo.write(resultado)
elif boxes2 is None or len(boxes2) == 0:
    resultado = "No se detectaron caras en la 2da imagen"
    with open('resultado.txt', 'w') as archivo:
            # Escribe el texto en el archivo
            archivo.write(resultado)
elif (boxes1 is None or len(boxes1) == 0) and (boxes2 is None or len(boxes2) == 0):
    resultado = "No se detectaron caras en ninguna de las imagenes"
    with open('resultado.txt', 'w') as archivo:
            # Escribe el texto en el archivo
            archivo.write(resultado)
else:
    # Extrae las características faciales de las caras recortadas
    features1 = resnet(face1.unsqueeze(0))
    features2 = resnet(face2.unsqueeze(0))

    # Calcula la distancia euclidiana entre las características faciales para la comparación
    distance = (features1 - features2).norm().item()

    # Imprime la distancia euclidiana
    print(f"La distancia euclidiana entre las dos caras es: {distance}")

    # Establece un umbral de similitud
    umbral = 0.5  # Puedes ajustar este valor según tus necesidades

    # Compara la distancia con el umbral
    if distance < umbral:
        resultado = "Las imagenes son de la misma persona"
        with open('resultado.txt', 'w') as archivo:
            # Escribe el texto en el archivo
            archivo.write(resultado)
    else:
        resultado = "Las imagenes son de personas diferentes"
        with open('resultado.txt', 'w') as archivo:
            # Escribe el texto en el archivo
            archivo.write(resultado)

img1 = "image_1.jpeg"
img2 = "image_2.jpeg"
result = "resultado.txt"

if os.path.exists(result):
    os.remove(img1)
    os.remove(img2)

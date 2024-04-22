import requests

data = {
    'x': [[1, 2, 2, 20000, 0, 0, 2, 2]]
}

response = requests.post('http://127.0.0.1:5000/predict', json=data)

if response.status_code == 200:
    result = response.json()
    print("Prediction:", result['prediction'])
else:
    print("Error:", response.json())

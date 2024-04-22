import pandas as pd
from flask import Flask, request, jsonify
from joblib import load

app = Flask(__name__)

model = load('../models/final_model.joblib')
scaler = load('../models/scaler.joblib')


@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the data from the request
        data = request.json

        # Get dataframe from input data
        x = pd.DataFrame(data['x'], columns=["MARRIED", "KIDS", "OCCAT2", "INCOME", "NETWORTH", "HOUSES", "EDUC", "FINLIT"])

        print(x)
        # Scale the input data
        x = scaler.transform(x)

        # Predict the risk tolerance value using the model & input data from request
        prediction = model.predict(x)[0]
        print(prediction)

        # Return the prediction as JSON
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

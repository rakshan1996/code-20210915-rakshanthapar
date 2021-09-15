const fs=require('fs');


//User Defined Constant strings 
const Overweight = "Overweight";

function processData() {
    var data = fs.readFileSync('./public/health.json', 'utf-8', (err, data) => {
        return data;
    });

    data =JSON.parse(data);
    
    
        var refinedData = [];
        var overweightPersonal = 0;
        for (var i = 0; i < data.length; i++) {
            var object = data[i];
            object.BMI = (object.WeightKg / Math.pow(object.HeightCm / 100, 2)).toFixed(1);
            var bmi=object.BMI;
            switch (true) {
                case bmi <= 18.4:
                    object.BMICategory = "Underweight";
                    object.HealthRisk = "Malnutrition risk";
                    break;
                case bmi >= 18.5 && bmi <= 24.9:
                    object.BMICategory = "Normal weight";
                    object.HealthRisk = "Low risk";
                    break;
                case bmi >= 25 && bmi <= 29.9:
                    object.BMICategory = Overweight;
                    object.HealthRisk = "Enhanced risk";
                    break;
                case bmi >= 30 && bmi <= 34.9:
                    object.BMICategory = "Moderately obese";
                    object.HealthRisk = "Medium risk";
                    break;
                case bmi >= 35 && bmi <= 39.9:
                    object.BMICategory = "Severely obese";
                    object.HealthRisk = "High risk";
                    break;
                case bmi >= 40:
                    object.BMICategory = "Very severely obese";
                    object.HealthRisk = "Very high risk";
                    break;
            }
           
            if (object.BMICategory === Overweight) {
                overweightPersonal++;
            }
            refinedData.push(object);
        }
        console.log(refinedData);
        fs.writeFile('./public/processeddata.json', JSON.stringify(refinedData), err => {
            if (err) {
                console.error(err)
                return
            }
        })

        return overweightPersonal;
    

}




module.exports ={
    processData:processData
}

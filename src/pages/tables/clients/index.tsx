import {CustomTable} from '@/components/CustomTable';

export default function ClientTable()  {
    return (
        <CustomTable caption={'Cars'} message={'No data available'} list={[
            {
                "model": "Audi A6",
                "brand": "Audi",
                "doorNo": 4,
                "registration": 2021,
                "kilometers": 10000.00,
                "purchasePrice": 35000.00,
                "colour": "White",
                "metallic": false,
                "region": "South",
                "emissionClass": "Euro 6",
                "horsepower": 140.00,
                "emissionSticker": "4 (Green)",
                "fuelType": "Petrol",
                "cubicCapacity": 1984.00,
                "sellingPrice": 40000.00,
                "lastUpdatedBy": 1
            },
            {
                "model": "Audi A6",
                "brand": "Toyota",
                "doorNo": 4,
                "registration": 2021,
                "kilometers": 10000.00,
                "purchasePrice": 35000.00,
                "colour": "White",
                "metallic": false,
                "region": "South",
                "emissionClass": "Euro 6",
                "horsepower": 140.00,
                "emissionSticker": "4 (Green)",
                "fuelType": "Petrol",
                "cubicCapacity": 1984.00,
                "sellingPrice": 40000.00,
                "lastUpdatedBy": 1
            }
        ]}></CustomTable>
    )
}
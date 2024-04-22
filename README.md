# SmartGarden (Demo)

-> IoT farm.

username: admin, password: 123456

## Devices is supplied:

- 1 temperature, 1 light intensive, 1 humidity, 1 soil moistur sensor.
- 1 light bulb, 1 water pump.
- 1 micro:bit

## Tecnology:

- Desktop Web (used in chrome): MySql + ExpressJS + React + Node.js
- Adafuit

## Member:

- Dung
- Cuong
- Quoc Huy
- Cong Huy
- Nam

## Main features:

1. Monitoring environment: temperature, light intensive, humidity, soil moisture.
2. Check the thresholds of environment values + auto running the devices (light bulb, water pump) when go out threshold (light intensive / soil moisture).
3. Schedule light bulb and water pump.
4. Log the operations of devices (light bulb, water pump).
5. Statistic + generate the report (optional .... :))).
6. AI (optional .... :))).

## Cách chạy:

1. Backend: cd đến folder Backend.

- Chạy lần đầu tiên:

  Tạo database mysql mới tên smartgarden
  
  npm i
  
  npx sequelize-cli db:migrate
  
  npx sequelize-cli db:seed:all
  
  npm start
  
- Những lần sau:

  npm start

2. Frontend: cd đến folder Frontend.

- Chạy lần đầu tiên:
  
  npm i
  
  npm run dev

- Những lần sau:
  
  npm run dev

## More:

**_..._**

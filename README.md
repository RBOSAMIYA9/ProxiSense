# ProxiSense

A proximity based smart attendence system.
<br/>
<a href="https://proxisense.ravindrabosamiya.tech/">
<button> View demo</button></a>

## Problem

Now a days in every office and workplace fingureprint based attendence system and face detection based attendence system is used, the biggest drawback of such systems is employees roam outside the workplace after punching in the fingureprint / face detection system.

Cumulatively such small unusual breaks leads to large
loss of working hours of a company.

## Working concept

Proxisense is a complete solution which works on concept of Bluetooth Low energy (BLE) advertising.
<br/>

<img src="src/indoorTracking.jpeg" alt="working-concept"/>

## Modules

1. Hardware <br/>
   ProxiSense hardware is a device responsible for scanning nearby BLE advertisement packects and sending data to the webapp via MQTT.

2. Mobile app <br/>
   Currently we have made mobile app which works on android platform and which creates BLE advertisement which further scanned by ProxiSense hardware.

3. Web app <br/>
   ProxiSense web app is main dashboard where administrator can add update delete the user and can also view employees present in primises in realtime.

### Tech

- Hardware <br/>
  ESP32, MQTT

- Mobile app <br/>
  BLE advertisement

- Web app <br/>
  Reactjs , firebase, heroku (for api)

## Benifits

- Time saved - money saved
- Increased productivity of employees
- Reduces error in payroll

## Web app Features

- Audio notification when employees enter or leave premises
- Add / update / delete employees
- update employee photo (selection based)
- Responsive design
- Dark mode

## ScreenShots

<img src="screenshots/fullPage.png" alt="homepage"/>
<p align="center">Homepage</p>

<img src="screenshots/login.png" alt="login"/>
<p align="center">Login page</p>

<img src="screenshots/dashboard.png" alt="dashboard"/>
<p align="center">Dashboard</p>

<img src="screenshots/employees.png" alt="employees"/>
<p align="center">View all employees</p>

<img src="screenshots/viewEmployeeDetails.png" alt="viewEmployeeDetails"/>
<p align="center">viewEmployeeDetails</p>

<img src="screenshots/editEmployeePhoto.png" alt="editEmployeePhoto"/>
<p align="center">editEmployeePhoto</p>



<img src="screenshots/createEmployee.png" alt="createEmployee"/>
<p align="center">createEmployee</p>
//9687870897
<img src="screenshots/dashboardDarkMode.png" alt="dashboardDarkMode"/>
<p align="center">Dashboard in dark Mode</p>

<img src="screenshots/responsiveDashboarMobile.png" alt="responsiveDashboarMobile"/>
<p align="center"> Dashboard in mobile view </p>

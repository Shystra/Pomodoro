# Pomodoro

This is my first project than I used on EC2 - AmazonLinux. For this, I used Apache sistem for to read index.html. 
All the comands on AmazonLinux was basead in Apache and Yam. 
IP -> http://54.152.117.167/

comands:
$sudo -i
$sudo yum update
$sudo yum install git
$git clone "repositor"

$sudo yum install httpd
$sudo systemctl start httpd

later change DocumentRoot for your folder /dist

$sudo nano /etc/httpd/conf/httpd.conf
(sunch "DocumentRoot /var/www/html")
change for "Document/Root /var/www/html/Pomodoro/dist"

$sudo systemctl restart httpd



This method help the users to focus in a atividies or in other assuns. 

This project was did in typescript and reactDOM using VITE for to render more speed.


![image](https://github.com/Shystra/Pomodoro/assets/124002796/89e7445f-7039-4a6b-a33e-208fc25fc141)![image](https://github.com/Shystra/Pomodoro/assets/124002796/c1d4334e-69af-4a5d-af26-c4d136a901c8)
![image](https://github.com/Shystra/Pomodoro/assets/124002796/a59c632d-fb45-49c1-8553-7e7ca2e36bb3)




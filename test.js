import { exec } from "child_process";

const comandos = [
  "npm run start GET products",
  "npm run start GET products/5",
  "npm run start POST products 'Remera Azul' 250 'ropa'",
  "npm run start PUT products/7 'Remera Roja' 300 'ropa'",
  "npm run start DELETE products/7"
];

comandos.forEach((cmd, index) => {
  console.log(`\n🔹 Ejecutando prueba #${index + 1}: ${cmd}`);
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`Resultado:\n${stdout}`);
  });
});

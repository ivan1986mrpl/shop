import { writeFile } from 'fs/promises';

// Генерация уникального ID
function generateUUID() {
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Генерация случайной цены
function getRandomPrice(min = 100, max = 500) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Базовые категории товаров
const baseProducts = [
  {
    category: "glasses-for-vision",
    series: "glasses",
    photo: ["assets/img/products/1.webp"],
    info: "description model glasses for vision"
  },
  {
    category: "sunglasses",
    series: "glasses",
    photo: ["assets/img/products/11.webp"],
    info: "description model sunglasses"
  },
  {
    category: "lenses",
    series: "contact-lenses",
    photo: ["assets/img/products/21.webp"],
    info: "description model contact lenses"
  }
];

// Массив номеров моделей от 1 до 300
const modelNumbers = Array.from({ length: 300 }, (_, i) => i + 1);

// Перемешаем номера моделей (чтобы они распределялись случайно)
modelNumbers.sort(() => Math.random() - 0.5);

const finalProducts = [];
let modelIndex = 0;

baseProducts.forEach(baseProduct => {
  for (let i = 0; i < 30; i++) {
    const oldPrice = getRandomPrice(300, 500);
    const newPrice = getRandomPrice(100, oldPrice - 1);
    const modelNumber = modelNumbers[modelIndex++];
    const formattedModel = `model ${String(modelNumber).padStart(3, '0')}`;

    finalProducts.push({
      ...baseProduct,
      id: generateUUID(),
      model: formattedModel,
      prices: [oldPrice, newPrice]
    });
  }
});

// Сохраняем в JSON-файл
await writeFile('products.json', JSON.stringify(finalProducts, null, 2), 'utf-8');
console.log('✅ Файл products.json успешно создан с 90 товарами и уникальными моделями');

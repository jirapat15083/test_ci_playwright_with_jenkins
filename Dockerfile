# ใช้ Node.js official image
FROM node:24

# ตั้ง working directory
WORKDIR /app

# copy package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies ของ npm
RUN npm install

# ติดตั้ง dependencies ของ Playwright browser
RUN npx playwright install --with-deps

# copy source code
COPY . .

# รัน Playwright test โดย default
CMD ["npx", "playwright", "test", "--reporter=line"]

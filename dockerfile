# # Sử dụng image Ubuntu làm base image
# FROM ubuntu:latest

# # Cập nhật các gói hệ thống và cài đặt các công cụ cần thiết
# RUN apt-get update && \
#     apt-get install -y curl && \
#     curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
#     apt-get install -y nodejs

# # Tạo thư mục làm việc trong container
# WORKDIR /app

# RUN npm init --yes

# # Cài đặt các dependencies
# RUN npm install && \
#     npm install express

# # Sao chép toàn bộ code của ứng dụng vào container
# COPY . .

# # Mở cổng mà ứng dụng Node.js sẽ lắng nghe (thường là 3000)
# EXPOSE 3000

# # Chạy ứng dụng Node.js khi container khởi động
# CMD [ "node", "server.js" ]


FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY source /app/ 

EXPOSE 3306
EXPOSE 3000

CMD [ "node", "server.js" ] 
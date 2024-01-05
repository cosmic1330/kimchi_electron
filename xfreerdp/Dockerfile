FROM ubuntu:latest

# 安裝xfreerdp和其他必要的依賴
RUN apt-get update
RUN apt-get install -y vim
RUN apt-get install -y freerdp2-x11 
RUN apt-get clean && rm -rf /var/lib/apt/lists/*
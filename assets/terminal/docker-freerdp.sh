#!/bin/bash

# bash ./assets/terminal/docker-freerdp.sh -u ubuntu -p ubuntu -v 127.0.0.1:14389
# 檢查是否已安裝 Docker
if ! command -v docker &> /dev/null; then
    echo "Error: Docker is not installed. Please install it first."
    exit 1
fi

set -e
while getopts  u:p:v:* flag
do
    case "${flag}" in
        u) user=${OPTARG};;
        p) password=${OPTARG};;
        v) vm=${OPTARG};;
        *) echo "Invalid option"; exit 1;;
    esac
done

shift $((OPTIND-1))

# 处理剩余的非选项参数
if [ "$#" -gt 0 ]; then
    non_option_args=("$@")
    for arg in "${non_option_args[@]}"; do
        echo "config argument: $arg"
    done
fi

# 使用 Docker 運行 xfreerdp 容器
docker exec -it xfreerdp-xfreerdp-1 bash &\
 xfreerdp /cert:tofu /u:"$user" /p:"$password" /v:"$vm" "$@"

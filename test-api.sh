#!/bin/bash

# API 测试脚本
# 使用方法: chmod +x test-api.sh && ./test-api.sh

BASE_URL="http://localhost:3008"
API_URL="${BASE_URL}/product"

echo "================================"
echo "   NestJS 商品 API 测试脚本"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 测试 1: 创建商品
echo -e "${BLUE}[测试 1] 创建商品${NC}"
echo "POST ${API_URL}"
curl -X POST ${API_URL} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试商品_'$(date +%s)'",
    "description": "这是一个测试商品",
    "price": 199.99,
    "stock": 100,
    "category": "测试分类",
    "status": "active"
  }' | json_pp
echo -e "\n"

# 等待1秒
sleep 1

# 测试 2: 查询商品列表
echo -e "${BLUE}[测试 2] 查询商品列表（分页）${NC}"
echo "GET ${API_URL}?page=1&pageSize=5"
curl -X GET "${API_URL}?page=1&pageSize=5" | json_pp
echo -e "\n"

# 等待1秒
sleep 1

# 测试 3: 条件查询
echo -e "${BLUE}[测试 3] 条件查询（搜索 'iPhone'）${NC}"
echo "GET ${API_URL}?name=iPhone&status=active"
curl -X GET "${API_URL}?name=iPhone&status=active" | json_pp
echo -e "\n"

# 等待1秒
sleep 1

# 测试 4: 查询商品详情
echo -e "${BLUE}[测试 4] 查询商品详情${NC}"
echo "GET ${API_URL}/1"
curl -X GET "${API_URL}/1" | json_pp
echo -e "\n"

# 等待1秒
sleep 1

# 测试 5: 更新商品
echo -e "${BLUE}[测试 5] 更新商品${NC}"
echo "PUT ${API_URL}/1"
curl -X PUT ${API_URL}/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 7499.00,
    "stock": 90,
    "description": "促销降价"
  }' | json_pp
echo -e "\n"

# 等待1秒
sleep 1

# 测试 6: 更新商品状态
echo -e "${BLUE}[测试 6] 更新商品状态${NC}"
echo "PUT ${API_URL}/1/status"
curl -X PUT ${API_URL}/1/status \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive"
  }' | json_pp
echo -e "\n"

# 等待1秒
sleep 1

# 测试 7: 更新商品库存
echo -e "${BLUE}[测试 7] 更新商品库存${NC}"
echo "PUT ${API_URL}/1/stock"
curl -X PUT ${API_URL}/1/stock \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 50
  }' | json_pp
echo -e "\n"

# 测试 8: 价格区间查询
echo -e "${BLUE}[测试 8] 价格区间查询（5000-10000）${NC}"
echo "GET ${API_URL}?minPrice=5000&maxPrice=10000"
curl -X GET "${API_URL}?minPrice=5000&maxPrice=10000" | json_pp
echo -e "\n"

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}   所有测试完成！${NC}"
echo -e "${GREEN}================================${NC}"

-- 创建数据库
CREATE DATABASE IF NOT EXISTS nest_db DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE nest_db;

-- 商品表（如果启用了 synchronize，TypeORM 会自动创建，这里仅作参考）
CREATE TABLE IF NOT EXISTS `products` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品ID',
  `name` VARCHAR(100) NOT NULL COMMENT '商品名称',
  `description` TEXT COMMENT '商品描述',
  `price` DECIMAL(10, 2) NOT NULL COMMENT '商品价格',
  `stock` INT DEFAULT 0 COMMENT '库存数量',
  `status` VARCHAR(50) DEFAULT 'active' COMMENT '商品状态: active-上架, inactive-下架',
  `category` VARCHAR(50) COMMENT '商品分类',
  `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updatedAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  INDEX `idx_name` (`name`),
  INDEX `idx_status` (`status`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 插入测试数据
INSERT INTO `products` (`name`, `description`, `price`, `stock`, `status`, `category`, `createdAt`, `updatedAt`)
VALUES
('iPhone 15 Pro', '最新款 iPhone，搭载 A17 Pro 芯片', 7999.00, 100, 'active', '手机', NOW(), NOW()),
('iPhone 15', 'iPhone 15 标准版', 5999.00, 150, 'active', '手机', NOW(), NOW()),
('MacBook Pro 14', '14英寸 M3 芯片笔记本电脑', 15999.00, 50, 'active', '电脑', NOW(), NOW()),
('MacBook Air 13', '13英寸 M2 芯片超轻薄笔记本', 8999.00, 80, 'active', '电脑', NOW(), NOW()),
('AirPods Pro', '主动降噪无线耳机', 1999.00, 200, 'active', '耳机', NOW(), NOW()),
('AirPods Max', '头戴式无线降噪耳机', 4399.00, 30, 'active', '耳机', NOW(), NOW()),
('iPad Pro 12.9', '12.9英寸 M2 芯片平板电脑', 9999.00, 60, 'active', '平板', NOW(), NOW()),
('iPad Air', '10.9英寸 M1 芯片平板电脑', 4799.00, 100, 'active', '平板', NOW(), NOW()),
('Apple Watch Ultra', '专业运动智能手表', 6299.00, 40, 'active', '手表', NOW(), NOW()),
('Apple Watch Series 9', '第九代智能手表', 2999.00, 120, 'active', '手表', NOW(), NOW()),
('Magic Keyboard', '妙控键盘', 999.00, 150, 'active', '配件', NOW(), NOW()),
('Magic Mouse', '妙控鼠标', 799.00, 180, 'active', '配件', NOW(), NOW()),
('iPhone 14 Pro', '上一代旗舰手机', 6999.00, 50, 'inactive', '手机', NOW(), NOW()),
('MacBook Pro 16', '16英寸 M3 Max 芯片笔记本', 24999.00, 20, 'active', '电脑', NOW(), NOW()),
('HomePod mini', '智能音箱', 749.00, 200, 'active', '音箱', NOW(), NOW());

-- 查看插入的数据
SELECT * FROM products;

-- 统计各分类商品数量
SELECT category, COUNT(*) as count, SUM(stock) as total_stock 
FROM products 
GROUP BY category;

-- 查看上架商品
SELECT * FROM products WHERE status = 'active' ORDER BY price DESC;

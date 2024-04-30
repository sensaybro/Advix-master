import { PrismaClient } from '@prisma/client' // Импортируем PrismaClient с указанием пути
import dotenv from 'dotenv' // Используем импорт по умолчанию для dotenv

const prisma = new PrismaClient()
dotenv.config() // Используем функцию config() напрямую

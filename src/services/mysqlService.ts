import mysql from 'mysql2/promise';
import { DATABASE_CONFIG } from '@/config/database';

interface Story {
  id: number;
  title: string;
  content: string;
  type: 'novel' | 'story';
  created_at: Date;
  updated_at: Date;
}

class MySQLService {
  private pool: mysql.Pool;

  constructor() {
    this.pool = mysql.createPool(DATABASE_CONFIG.mysql);
  }

  async saveStory(title: string, content: string, type: 'novel' | 'story'): Promise<number> {
    try {
      const [result] = await this.pool.execute(
        'INSERT INTO stories (title, content, type) VALUES (?, ?, ?)',
        [title, content, type]
      );

      return (result as mysql.ResultSetHeader).insertId;
    } catch (error) {
      console.error('MySQL save error:', error);
      throw new Error('保存内容时出错');
    }
  }

  async getStoryById(id: number): Promise<Story | null> {
    try {
      const [rows] = await this.pool.execute(
        'SELECT * FROM stories WHERE id = ?',
        [id]
      );

      const stories = rows as Story[];
      return stories[0] || null;
    } catch (error) {
      console.error('MySQL get error:', error);
      throw new Error('获取内容时出错');
    }
  }

  async getStoriesByType(type: 'novel' | 'story'): Promise<Story[]> {
    try {
      const [rows] = await this.pool.execute(
        'SELECT * FROM stories WHERE type = ? ORDER BY created_at DESC',
        [type]
      );

      return rows as Story[];
    } catch (error) {
      console.error('MySQL list error:', error);
      throw new Error('获取列表时出错');
    }
  }
}

export const mysqlService = new MySQLService(); 
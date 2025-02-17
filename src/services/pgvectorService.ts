import { Pool } from 'pg';
import { DATABASE_CONFIG } from '@/config/database';

interface VectorEntry {
  id: number;
  content: string;
  embedding: number[];
  metadata: Record<string, any>;
  created_at: Date;
}

class PGVectorService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(DATABASE_CONFIG.postgres);
  }

  async saveVector(content: string, embedding: number[], metadata: Record<string, any>): Promise<number> {
    try {
      const result = await this.pool.query(
        'INSERT INTO vector_store (content, embedding, metadata) VALUES ($1, $2, $3) RETURNING id',
        [content, embedding, metadata]
      );

      return result.rows[0].id;
    } catch (error) {
      console.error('PGVector save error:', error);
      throw new Error('保存向量时出错');
    }
  }

  async searchSimilar(embedding: number[], limit: number = 5): Promise<VectorEntry[]> {
    try {
      const result = await this.pool.query(
        `SELECT id, content, metadata, created_at, 
                1 - (embedding <=> $1) as similarity
         FROM vector_store
         ORDER BY embedding <=> $1
         LIMIT $2`,
        [embedding, limit]
      );

      return result.rows;
    } catch (error) {
      console.error('PGVector search error:', error);
      throw new Error('搜索相似内容时出错');
    }
  }

  async deleteVector(id: number): Promise<void> {
    try {
      await this.pool.query(
        'DELETE FROM vector_store WHERE id = $1',
        [id]
      );
    } catch (error) {
      console.error('PGVector delete error:', error);
      throw new Error('删除向量时出错');
    }
  }
}

export const pgvectorService = new PGVectorService(); 
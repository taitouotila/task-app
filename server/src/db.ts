import { Request, Response } from 'express';
import { Pool } from 'pg';
import { config } from 'dotenv';

config({ path: '.env' });

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432'),
});


const getTasks = async (req: Request, res: Response) => {
    pool.query('SELECT * FROM task ORDER BY id', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    })
}

const createTask = async (req: Request, res: Response) => {
    const { title } = req.body;

    pool.query('INSERT INTO task (title) VALUES ($1) RETURNING *', [title], (error, results) => {
        if (error) {
            throw error;
        }
        const task = results.rows.map((row) => {
            return {
                "id": row.id,
                "title": row.title,
                "completed": row.completed,
                "created_at": row.created_at,
                "completed_at": row.completed_at,
            }
        })
        res.status(201).json(task);
    })
}

const editTask = async (req: Request, res: Response) => {
    const { title } = req.body;
    const id: number = parseInt(req.params.id);

    pool.query('UPDATE task SET title = $1 WHERE id = $2 RETURNING *', [title, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(title);
    })
}

const deleteTask = (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);

    pool.query('DELETE FROM task WHERE id = ($1)', [id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount != 1) {
            console.log(`Task not found with ID: ${id}`);
            return res.status(404).send(`No task found with ID: ${id}`);
        }
        return res.status(200).send(`Deleted task with ID: ${id}`);
    })
}

const toggleTaskCompleted = async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const completed: boolean = req.body.completed;

    pool.query('UPDATE task SET completed = $1, completed_at = CASE WHEN $1 = TRUE THEN now() ELSE NULL END WHERE id = $2 RETURNING *', [completed, id], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rowCount != 1) {
            console.log(`Task not found with ID: ${id}`);
            return res.status(404).send(`No task found with ID: ${id}`);
        }
        return res.status(200).send(`Task marked complete with ID: ${results.rows[0].id}.`);
    })
}
module.exports = {
    getTasks,
    createTask,
    editTask,
    deleteTask,
    toggleTaskCompleted,
}

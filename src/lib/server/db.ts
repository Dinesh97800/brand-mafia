import mysql, { type Pool } from "mysql2/promise";
import { getDbConfig } from "./config";

let pool: Pool | null = null;
let ready: Promise<Pool> | null = null;

const TABLES_SQL = [
  `CREATE TABLE IF NOT EXISTS contact_requests (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(190) NOT NULL,
    phone VARCHAR(40) DEFAULT NULL,
    service VARCHAR(120) DEFAULT NULL,
    message TEXT NOT NULL,
    source VARCHAR(80) NOT NULL DEFAULT 'contact',
    ip VARCHAR(45) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_contact_created (created_at),
    KEY idx_contact_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    email VARCHAR(190) NOT NULL,
    source VARCHAR(80) NOT NULL DEFAULT 'website',
    ip VARCHAR(45) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_newsletter_email (email),
    KEY idx_newsletter_created (created_at)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

async function initPool(): Promise<Pool> {
  const config = getDbConfig();
  const bootstrap = await mysql.createConnection({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
  });

  try {
    await bootstrap.query(
      `CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
  } catch (error) {
    console.warn(
      "[db] Could not create database automatically. Create it in phpMyAdmin if it does not exist.",
      error
    );
  }
  await bootstrap.end();

  const created = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database,
    waitForConnections: true,
    connectionLimit: 8,
    charset: "utf8mb4",
  });

  for (const sql of TABLES_SQL) {
    await created.query(sql);
  }

  return created;
}

export async function getDb(): Promise<Pool> {
  if (pool) return pool;
  if (!ready) {
    ready = initPool()
      .then((created) => {
        pool = created;
        return created;
      })
      .catch((error) => {
        ready = null;
        throw error;
      });
  }
  return ready;
}

import type { IdlenessConfig } from './type'
import { existsSync, readFileSync } from 'node:fs'
import { chmod, copyFile, rename, unlink, writeFile } from 'node:fs/promises'
import { homedir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import process from 'node:process'
import json5 from 'json5'
import { IdlenessSchema } from './zod-schema'

export class ConfigIO {
  configPath = join(homedir(), '.idleness', 'config.json')

  loadConfig(): IdlenessConfig {
    if (!existsSync(this.configPath)) {
      return {}
    }

    const raw = readFileSync(this.configPath, 'utf-8')
    const parsed = json5.parse(raw)

    /** zod 验证 */
    const validated = IdlenessSchema.safeParse(parsed)

    return validated.success ? validated.data : {}
  }

  async writeConfigFile(config: IdlenessConfig) {
    /** 写入前先验证 */
    const validated = IdlenessSchema.safeParse(config)

    if (!validated.success) {
      throw new Error('Invalid config')
    }

    const dir = dirname(this.configPath)

    const json = json5.stringify(validated.data, null, 2)
      .trimEnd()
      .concat('\n')

    const tmp = join(
      dir,
      `${basename(this.configPath)}.${process.pid}.${crypto.randomUUID()}.tmp`,
    )

    /** 写入临时文件确保权限设置正确 0o600 只允许文件所有者对文件进行读写操作 */
    await writeFile(tmp, json, { encoding: 'utf-8', mode: 0o600 })

    if (existsSync(this.configPath)) {
      /** 备份原文件 */
      await copyFile(this.configPath, `${this.configPath}.bak`).catch(() => {
        // best-effort
      })
    }

    try {
      await rename(tmp, this.configPath)
    }
    catch (err) {
      const code = (err as { code?: string }).code
      // Windows doesn't reliably support atomic replace via rename when dest exists.
      if (code === 'EPERM' || code === 'EEXIST') {
        await copyFile(tmp, this.configPath)
        await chmod(this.configPath, 0o600).catch(() => {
          // best-effort
        })
        await unlink(tmp).catch(() => {
          // best-effort
        })
        return
      }
      await unlink(tmp).catch(() => {
        // best-effort
      })
      throw err
    }
  }
}

export const configIO = new ConfigIO()

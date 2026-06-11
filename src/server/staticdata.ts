import YAML from 'yaml'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { type Quest } from '../shared/schemas/quest';

export const quests: Quest[] = YAML.parse(readFileSync(path.join('quests.yaml'), 'utf-8')).quests;

/**
 * @format
 * Local Embedding model
 * text2vec-large-chinese
 * DIM: 1024
 */

import { IndexesOptions, WhereOptions } from 'sequelize'
import {
    Table,
    Column,
    AutoIncrement,
    PrimaryKey,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    AllowNull,
    Default
} from 'sequelize-typescript'
import { Resource } from './Resource'
import { EmbedModel } from 'uniai'

const EMBED_DIM = 1024

const indexes: IndexesOptions[] = [{ fields: ['resource_id'] }]

@Table({ modelName: 'text2vec_embedding', indexes })
export class Embedding2 extends Model {
    /** Unique identifier for the embedding. */
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number

    /** Page number associated with the embedding. */
    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    page: number

    /** Foreign key referencing the associated resource. */
    @AllowNull(false)
    @ForeignKey(() => Resource)
    @Column(DataType.INTEGER)
    resourceId: number

    /** Array containing the embedding data. */
    @Column({
        type: `VECTOR(${EMBED_DIM})`,
        get() {
            const raw: string | null = this.getDataValue('embedding')
            return raw ? (JSON.parse(raw) as number[]) : null
        },
        set(v: number[]) {
            if (Array.isArray(v) && v.every(e => typeof e === 'number') && v.length === EMBED_DIM)
                this.setDataValue('embedding', JSON.stringify(v))
            else this.setDataValue('embedding', null)
        }
    })
    embedding: number[] | null

    /**
     * Find all embeddings similar to a given vector.
     * @param vector - The vector for which to find similar embeddings.
     * @param limit - The maximum number of results to return (optional).
     * @param where - Additional query conditions (optional).
     * @returns A promise that resolves to an array of similar embeddings.
     */
    static async similarFindAll(vector: number[], limit?: number, where?: WhereOptions) {
        const db = this.sequelize
        return await this.findAll({
            order: db?.literal(`embedding <=> '${JSON.stringify(vector)}' ASC`),
            where,
            limit
        })
    }

    /** Content associated with the embedding. */
    @AllowNull(false)
    @Default('')
    @Column(DataType.TEXT)
    content: string

    /** Number of tokens in the content. */
    @AllowNull(false)
    @Default(0)
    @Column(DataType.INTEGER)
    tokens: number

    @Column(DataType.STRING)
    model: EmbedModel | string | null

    /** Belongs to the associated resource. */
    @BelongsTo(() => Resource)
    resource: Resource
}

export default () => Embedding2

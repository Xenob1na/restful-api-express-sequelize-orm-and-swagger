import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "users",
})

export class User extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type : DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email!: string;
}
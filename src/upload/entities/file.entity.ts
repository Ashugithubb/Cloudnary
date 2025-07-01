import { timeStamp } from "console";
import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('File_Meta_Data')
export class FileTable {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    FileName: string;

    @Column()
    FileType: string
    @Column()
    FileSize: string
    @Column()
    url: string
    @CreateDateColumn({ type: 'timestamptz'})
    uploadedAt: Date;

}
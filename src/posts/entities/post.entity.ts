import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Post {
    @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
    postId: number;

    @Column({ type: 'smallint', unsigned: true })
    userId: number;

    @ManyToOne(()=>User)
    user: User;

    @Column({ type: 'varchar', length: 40 })
    title: string;

    @Column({ type: 'text'})
    content: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;
}
import { Post } from "src/posts/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
    userId: number;

    @Column({ type: 'varchar', length: 40, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    @Column({ type: 'varchar', length: 40, unique: true })
    nickname: string;

    @Column({ type: 'varchar', length: 40, default: 'default_comment.webp' })
    profComment: string;

    @Column({ type: 'varchar', length: 40, default: 'default_mypage.webp' })
    profMypage: string;

    @Column({ type: 'varchar', length: 40, default: 'local' })
    provider: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date;

    // @OneToMany(() => Post, (post) => post.userId)
    // posts: Post[]
}
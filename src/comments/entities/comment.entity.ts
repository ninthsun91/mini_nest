import { Post } from "src/posts/entities/post.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn({ type: 'smallint', unsigned: true })
    commentId: number;

    @Column({ type: 'smallint', unsigned: true })
    userId: number;

    @Column({ type: 'smallint', unsigned: true })
    postId: number;

    @Column({ type: 'varchar', length: 255 })
    comment: string;

    @ManyToOne(()=>User)
    user: User

    @ManyToOne(()=>Post)
    post: Post

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date

    @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Date
}
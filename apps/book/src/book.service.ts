import { Injectable } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}
  create(createBookInput: CreateBookInput) {
    const book = new Book();
    book.title = createBookInput.title;
    book.nbPages = createBookInput.nbPages;
    book.year = createBookInput.year;
    book.authorId = createBookInput.authorId;
    return this.bookRepository.save(book);
  }

  findAll() {
    return this.bookRepository.find();
  }

  findAllByAuthorId(authorId: number) {
    return this.bookRepository.find({
      where: {
        authorId: authorId,
      },
    });
  }

  findOne(id: number) {
    return this.bookRepository.findOneBy({
      id: id,
    });
  }

  update(id: number, updateBookInput: UpdateBookInput) {
    const book = new Book();
    book.id = id;
    if (updateBookInput.title != null) {
      book.title = updateBookInput.title;
    }
    if (updateBookInput.nbPages != null) {
      book.nbPages = updateBookInput.nbPages;
    }
    if (updateBookInput.year != null) {
      book.year = updateBookInput.year;
    }
    if (updateBookInput.authorId != null) {
      book.authorId = updateBookInput.authorId;
    }
    return this.bookRepository.save(book);
  }

  remove(id: number) {
    const book = new Book();
    book.id = id;
    return this.bookRepository.remove(book);
  }
}

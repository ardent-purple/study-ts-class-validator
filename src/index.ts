import {
  validate,
  Contains, // строка содежрит подстроку?
  IsInt, // это целое число?
  Length, // Фабрика - (min, max) - проверяет свойство на длину в диапазоне
  IsEmail, // валидация мыла
  IsFQDN, // fully qualified domain name
  IsDate, // это дата?
  Min, // минимум
  Max, // максимум
} from 'class-validator'

class BlogPost {
  @Length(10, 50)
  title: string

  @Contains('hello')
  content: string

  @IsInt()
  @Max(10)
  @Min(0)
  rating: number

  @IsEmail()
  email: string

  @IsFQDN()
  site: string

  @IsDate()
  createDate: Date
}

const blog = new BlogPost()
// all will not pass
blog.title = 'aaaa'
blog.content = 'Hello'
blog.rating = 11.5
blog.email = 'google.com'
blog.site = 'google'
blog.createDate = new Date()

validate(blog).then((errors) => {
  if (errors.length > 0) {
    errors.forEach((err) => {
      console.log('validation error: ')
      Object.entries(err.constraints).forEach((errorEntry) =>
        console.log(errorEntry)
      )
    })
  } else {
    console.log('validation succeeded!')
  }
})

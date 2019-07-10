import React from 'react'
import uuidv1 from 'uuid/v1' // Node package used to generate unique keys

const Course = ({courses}) => {
  const listCourses = () => courses.map(course => {
    const exercises = course.parts.map(part => part.exercises);
    const total = exercises.reduce( (accumulator, sum) => accumulator + sum);

    return (
      <div key={uuidv1()}>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total total={total}/>
      </div>
    )
  })

  return (
    <>
      {listCourses()}
    </>
  )
}

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  const contentList = () => parts.map(part => 
    <Part key={uuidv1()} part={part} />
  )
  
  return (
    <>
      {contentList()}
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ total }) => {
  return(
    <strong>Total of {total} exercises</strong>
  )
}

export default Course
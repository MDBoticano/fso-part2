import React from 'react'
import ReactDOM from 'react-dom'

// Node package used to generate unique keys
import uuidv1 from 'uuid/v1'

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  

  return (
    <div>
      <Course courses={courses}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
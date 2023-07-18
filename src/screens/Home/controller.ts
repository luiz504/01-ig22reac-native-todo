import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'
import { generateRandomId } from '@/utils/generateRandomId'

interface Task {
  id: string
  description: string
  done: boolean
}

const formCreateTaskSchema = z.object({
  description: z.string().nonempty(),
})
type FormCreateTask = z.infer<typeof formCreateTaskSchema>

export const useHomeController = () => {
  const { control, handleSubmit, setValue, getValues } =
    useForm<FormCreateTask>({
      resolver: zodResolver(formCreateTaskSchema),
    })

  const [tasks, setTasks] = useState<Task[]>([
    {
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet numquam at, nemo possimus impedit cumque ipsa dolorem officia accusamus minus qui perspiciatis aperiam, esse error alias sapiente ullam delectus eum?',
      done: false,
      id: '123123',
    },
  ])

  const onSubmit = (data: FormCreateTask) => {
    setTasks((old) =>
      old.concat({
        id: generateRandomId(),
        description: data.description,
        done: false,
      }),
    )
    setValue('description', '')
  }

  return {
    control,
    setValue,
    getValues,
    handleSubmit,
    onSubmit,
    tasks,
  }
}
package main

import (
	"fmt"
	"time"
)

func main() {
	task := Task{
		title: "Studying Go",
		done:  TODO,
		due:   nil,
	}

	fmt.Println(task)
	fmt.Println(task.IsDone())
}

type Task struct {
	title string
	done  status
	due   *time.Time
}

type status string

const (
	UNKNOWN status = "unknown"
	TODO    status = "todo"
	DONE    status = "done"
)

func (task Task) IsDone() bool {
	return task.done == DONE
}

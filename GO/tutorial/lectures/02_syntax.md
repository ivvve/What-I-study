```go
package main

import (
	"fmt"
	"math"
)

func foo() {
    // go의 모듈은 소문자이고 모듈 함수는 PascalCase이다.
	fmt.Println("The square root of 4 is", math.Sqrt(4))
}

func main() {
	foo()
}
```

```go
package main

import (
	"fmt"
	"math"
	"math/rand"
)

func foo() {
	fmt.Println("The square root of 4 is", math.Sqrt(4))
	//math.rand 이런식으로는 쓸 수 없다
	println("A number from 1-100", rand.Intn(100))
}

func main() {
	foo()
}
```

특정 패키지에 대해 궁금하다면 cmd를 통해 docs를 볼 수 있다.
```bash
$ go doc fmt

package fmt // import "fmt"

Package fmt implements formatted I/O with functions analogous to C's printf
and scanf. The format 'verbs' are derived from C's but are simpler.
```
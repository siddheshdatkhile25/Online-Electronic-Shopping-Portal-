Perfect 👍
Now we’ll add **GLOBAL EXCEPTION HANDLING** so that **ALL your APIs** return **consistent, clean error responses**.

This is **very important for interviews** and real projects.

---

# ✅ Global Exception Handling (for All APIs)

We’ll use:

* `@RestControllerAdvice`
* Custom exceptions
* Clean error response format

---

## 🔹 Final Error Response Format

```json
{
  "message": "User not found with id: 5",
  "timestamp": "2026-01-21T18:45:10"
}
```

---

## 1️⃣ Create Error Response DTO

📁 `com.backend.common.dtos`

```java
package com.backend.common.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ErrorResponse {

    private String message;
    private LocalDateTime timestamp;
}
```

---

## 2️⃣ Create Custom Exceptions (Recommended)

📁 `com.backend.common.exceptions`

### 🔹 UserNotFoundException

```java
package com.backend.common.exceptions;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }
}
```

---

### 🔹 DuplicateResourceException

```java
package com.backend.common.exceptions;

public class DuplicateResourceException extends RuntimeException {

    public DuplicateResourceException(String message) {
        super(message);
    }
}
```

---

### 🔹 InvalidCredentialsException

```java
package com.backend.common.exceptions;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException(String message) {
        super(message);
    }
}
```

---

## 3️⃣ Update Service Layer to Throw Custom Exceptions

### Example fixes in `UserServiceImpl`

```java
// Get user by ID
User user = userRepo.findById(id)
        .orElseThrow(() ->
            new UserNotFoundException("User not found with id: " + id)
        );
```

```java
// Register
if (userRepo.existsByEmail(dto.getEmail())) {
    throw new DuplicateResourceException("Email already registered");
}
```

```java
// Login
throw new InvalidCredentialsException("Invalid email or password");
```

---

## 4️⃣ Create Global Exception Handler

📁 `com.backend.common.exceptions`

```java
package com.backend.common.exceptions;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.backend.common.dtos.ErrorResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // User not found
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
            UserNotFoundException ex) {

        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), LocalDateTime.now()),
                HttpStatus.NOT_FOUND
        );
    }

    // Duplicate resource
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicate(
            DuplicateResourceException ex) {

        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), LocalDateTime.now()),
                HttpStatus.CONFLICT
        );
    }

    // Invalid login
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentials(
            InvalidCredentialsException ex) {

        return new ResponseEntity<>(
                new ErrorResponse(ex.getMessage(), LocalDateTime.now()),
                HttpStatus.UNAUTHORIZED
        );
    }

    // Validation errors (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(
            MethodArgumentNotValidException ex) {

        String message = ex.getBindingResult()
                .getFieldErrors()
                .get(0)
                .getDefaultMessage();

        return new ResponseEntity<>(
                new ErrorResponse(message, LocalDateTime.now()),
                HttpStatus.BAD_REQUEST
        );
    }

    // Fallback (any other exception)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {

        return new ResponseEntity<>(
                new ErrorResponse("Internal server error", LocalDateTime.now()),
                HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
}
```

---

## 5️⃣ Example Error Responses (Now Automatic)

### ❌ User Not Found

```
GET /users/99
```

```json
{
  "message": "User not found with id: 99",
  "timestamp": "2026-01-21T18:50:22"
}
```

---

### ❌ Duplicate Email

```json
{
  "message": "Email already registered",
  "timestamp": "2026-01-21T18:51:10"
}
```

---

### ❌ Invalid Login

```json
{
  "message": "Invalid email or password",
  "timestamp": "2026-01-21T18:52:40"
}
```

---

### ❌ Validation Error

```json
{
  "message": "Email is required",
  "timestamp": "2026-01-21T18:53:15"
}
```

---

## 🧠 Interview One-Liner (VERY IMPORTANT)

> **Global exception handling using `@RestControllerAdvice` ensures consistent error responses and keeps controllers clean.**

---

## ✅ What You Achieved

✔ Clean API responses
✔ No try–catch in controllers
✔ Proper HTTP status codes
✔ Industry-level structure

---

### 🔥 What next?

* Soft delete / deactivate user
* Search users
* Order module APIs
* Add JWT security
* Prepare interview explanation flow

Just tell me 👍

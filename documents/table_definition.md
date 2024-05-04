### Users 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 |AUTO INCREMENT        |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| group_id                  | BIGINT       | FK   | true     |              |                      |
| username                  | VARCHAR(50)  |      | true     |              |                      |
| password                  | VARCHAR(255) |      | true     |              |                      |
| role_id                   | BIGINT       | FK   | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Groups 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| group_name                | VARCHAR(255) |      | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Roles 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| role_name                 | VARCHAR(100) |      | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### User_manuals 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| user_id                   | BIGINT       | PK(FK) | true     |              |                      |
| manual_id                 | BIGINT       | PK(FK) | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### User_questions 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| user_id                   | BIGINT       | PK(FK) | true     |              |                      |
| question_id               | BIGINT       | PK(FK) | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Manuals 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| view_count                | INT          |      | true     | 0            |                      |
| manual_title              | VARCHAR(30)  |      | true     |              |                      |
| step_id                   | BIGINT       | FK   | true     |              |                      |
| is_draft                  | BOOLEAN      |      | true     | 1(true)      |                      |
| deleted_at                | DATETIME     |      | false    |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Questions 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| manual_id                 | BIGINT       | FK   | true     |              |                      |
| highlight_start           | INT          |      | true     |              |                      |
| highlight_end             | INT          |      | true     |              |                      |
| correct_answer            | VARCHAR(255) |      | true     |              |                      |
| view_count                | INT          |      | true     | 0            |                      |
| is_draft                  | BOOLEAN      |      | true     | 1(true)      |                      |
| deleted_at                | DATETIME     |      | false    |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Genre_manuals 

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| genre_id                  | BIGINT       | PK(FK) | true     |              |                      |
| manual_id                 | BIGINT       | PK(FK) | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Genres

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| genre_id                  | BIGINT       | PK   | true     |              | true                 |
| genre_name                | VARCHAR(50)  |      | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Educational_program_manuals

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| educational_program_id    | BIGINT       | PK(FK) | true     |              |                      |
| manual_id                 | BIGINT       | PK(FK) | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Educational_programs

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| educational_program_id    | BIGINT       | PK   | true     |              | true                 |
| program_name              | VARCHAR(50)  |      | true     |              |                      |
| progress                  | INT          |      | true     | 0            |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Steps

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | false    |              |                      |
| step_subtitle             | VARCHAR(100) |      | true     |              |                      |
| step_comment              | TEXT         |      | true     |              |                      |
| manual_id                 | BIGINT       | FK   | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Media

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| step_image_url            | TEXT         |      | false    |              |                      |
| step_video_url            | TEXT         |      | false    |              |                      |
| s3_key                    | TEXT         |      | true     |              |                      |
| file_size                 | BIGINT       |      | true     |              |                      |
| content_type              | VARCHAR(255) |      | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Background_images

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| background_image_id       | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Texts_on_images

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| text_content              | VARCHAR(255) |      | true     |              |                      |
| font_size                 | INT          |      | true     | 32           |                      |
| position_x                | INT          |      | true     |              |                      |
| position_y                | INT          |      | true     |              |                      |
| text_angle                | FLOAT        |      | true     | 0            |                      |
| box_width                 | INT          |      | true     | 50           |                      |
| box_height                | INT          |      | true     | 40           |                      |
| text_width                | INT          |      | true     | 2            |                      |
| font_color                | VARCHAR(20)  |      | true     | #000000      |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Lines_on_images

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| start_point_x             | INT          |      | true     |              |                      |
| start_point_y             | INT          |      | true     |              |                      |
| end_point_x               | INT          |      | true     |              |                      |
| end_point_y               | INT          |      | true     |              |                      |
| line_angle                | FLOAT        |      | true     | 0            |                      |
| stroke_width              | INT          |      | true     | 5            |                      |
| stroke_color              | VARCHAR(20)  |      | true     | #000000      |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Arrows_on_images

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| start_point_x             | INT          |      | true     |              |                      |
| start_point_y             | INT          |      | true     |              |                      |
| end_point_x               | INT          |      | true     |              |                      |
| end_point_y               | INT          |      | true     |              |                      |
| arrow_angle               | FLOAT        |      | true     | 0            |                      |
| arrowhead_width           | INT          |      | true     | 10           |                      |
| arrowhead_length          | INT          |      | true     | 15           |                      |
| arrowline_width           | INT          |      | true     | 5            |                      |
| arrow_color               | VARCHAR(20)  |      | true     | #000000      |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Rectangles_on_images

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| start_point_x             | INT          |      | true     |              |                      |
| start_point_y             | INT          |      | true     |              |                      |
| rectangle_angle           | FLOAT        |      | true     | 0            |                      |
| rectangle_width           | INT          |      | true     |              |                      |
| rectangle_height          | INT          |      | true     |              |                      |
| stroke_width              | INT          |      | true     | 5            |                      |
| stroke_color              | VARCHAR(20)  |      | true     | #000000      |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

### Ellipses_on_images

| カラム名                  | データ型     | キー | NOT NULL | デフォルト値 | AUTO INCREMENT　　　 |
| ------------------------- | ------------ | ---- | -------- | ------------ | -------------------- |
| id                        | BIGINT       | PK   | true     |              | true                 |
| media_id                  | BIGINT       | FK   | true     |              |                      |
| center_x                  | INT          |      | true     |              |                      |
| center_y                  | INT          |      | true     |              |                      |
| radius_x                  | INT          |      | true     |              |                      |
| radius_y                  | INT          |      | true     |              |                      |
| ellipse_angle             | FLOAT        |      | true     | 0            |                      |
| stroke_width              | INT          |      | true     | 5            |                      |
| stroke_color              | VARCHAR(20)  |      | true     | #000000      |                      |
| created_at                | DATETIME     |      | true     |              |                      |
| updated_at                | DATETIME     |      | true     |              |                      |

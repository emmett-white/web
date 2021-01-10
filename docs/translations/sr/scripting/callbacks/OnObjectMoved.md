---
title: OnObjectMoved
description: Овај колбек се јавља када је објект померен након MoveObject (када се престане кретати)
tags: []
---

## Deskripcija

Овај колбек се јавља када је објект померен након MoveObject (када се престане кретати)

| Име      | Дескрипција                 |
| -------- | --------------------------- |
| objectid | ИД објекта који је померен  |

## Враћања

Увек је позвана прва у филтерскриптама.

## Примери

```c
public OnObjectMoved(objectid)
{
    printf("Објект %d је завршио своје кретање.", objectid);
    
    return 1;
}
```

## Белешке

:::tip

SetObjectPos не ради када га користите у овом колбеку. Како бисте поправили то, поново креирајте објект.

:::

## Сродне функције

- [MoveObject](../functions/MoveObject.md): Помери објект.
- [MovePlayerObject](../functions/MovePlayerObject.md): Помери играчев објект.
- [IsObjectMoving](../functions/IsObjectMoving.md): Проверава да ли се објект креће.
- [StopObject](../functions/StopObject.md): Зауставља објект (зауставља кретање).
- [OnPlayerObjectMoved](OnPlayerObjectMoved.md): Позван када се играчев објект престане кретати.

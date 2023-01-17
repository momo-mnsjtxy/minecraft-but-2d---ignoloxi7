namespace SpriteKind {
    export const breakableBlock = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.breakableBlock, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(10)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    playerJump()
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (info.score() > 0) {
        playerATK()
        info.changeScoreBy(-1)
    }
})
function sceneSetUp () {
    tiles.setCurrentTilemap(tilemap`level1`)
    scene.setBackgroundColor(9)
    chest2()
    makeEnemy1()
}
function playerJump () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -150
    }
}
function chest2 () {
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        chest = sprites.create(img`
            f f f f f f f f f f f f f f f f 
            f 5 4 4 4 4 e e e e e 4 e 5 5 f 
            f 5 e e e e 4 e e 4 4 4 4 5 5 f 
            f 4 4 4 4 4 e 1 1 e 4 4 4 4 4 f 
            f e e e e 4 e 1 1 e 4 4 4 4 4 f 
            f f f f f f f 1 1 f f f f f f f 
            f e e e e e e 1 1 e e e e e e f 
            f 4 4 4 4 4 e e e e 4 4 4 4 e f 
            f 4 4 4 4 4 e 4 4 4 4 4 4 4 4 f 
            f e e e e 4 4 4 e e e 4 4 e e f 
            f 4 4 4 4 4 e e e e 4 4 4 4 4 f 
            f 4 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
            f 4 4 4 4 4 4 e e e e e 4 5 4 f 
            f e 5 4 4 4 4 e 4 4 4 e e e e f 
            f 4 e e e 4 4 e 4 4 e 4 4 4 4 f 
            f f f f f f f f f f f f f f f f 
            `, SpriteKind.breakableBlock)
        tiles.placeOnTile(chest, value)
    }
}
function makeEnemy1 () {
    for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
        wolf = sprites.create(img`
            .....f.......................
            .....f.cccbbc................
            ...1b11bcbbddbbbd1dbdd.......
            ...1b1bcccbd1dbb11111dddd....
            ...11b1cbbbd11db11111ddddd...
            11dd111c111d111dd11111ddddd..
            cddd111c1111d111111111..dddd.
            1cfdd11cccdd1d11111111...dddd
            .......d1cbd1dddc1d111.......
            .......dd.........dd.........
            .......11.........11.........
            .......d1.........d1.........
            .......d1.........d1.........
            .......bc.........bc.........
            .......cc.........cc.........
            .......11.........11.........
            `, SpriteKind.Enemy)
        wolf.ay = 500
        tiles.placeOnTile(wolf, value)
        if (wolf.vx < 0) {
            wolf.image.flipX()
            wolf.setImage(wolf.image)
        }
    }
}
function playerSetUp () {
    mySprite = sprites.create(img`
        ....ffffffff....
        ....ffffffff....
        ....fddddddf....
        ....ddddddee....
        ....d18dd81e....
        ....eddccdee....
        ....eeccccee....
        ....eeeeeeee....
        666666edee666666
        6666666ee6666666
        6666666666666666
        6666666666666666
        dddd66666666dddd
        dedd66666666dded
        dede66666666eded
        ddde66666666eddd
        ddde66666666eddd
        dddd66666666dddd
        dded88888c66eddd
        edee888888c6eede
        ....88888888....
        ....88888888....
        ....88888888....
        ....88888888....
        ....88888888....
        ....8cc88cc8....
        ....88888888....
        ....88888888....
        ....88888888....
        ....88888888....
        ....bbbbbbbb....
        ....bbbbbbbb....
        `, SpriteKind.Player)
    controller.moveSprite(mySprite, 100, 0)
    mySprite.ay = 500
    scene.cameraFollowSprite(mySprite)
    tiles.placeOnRandomTile(mySprite, assets.tile`myTile7`)
    info.setLife(20)
    info.setScore(0)
}
function playerATK () {
    sword = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . . f 4 e f 
        . . . . . . . . . . . f 4 e 4 f 
        . . . . . . . . . . f 4 e 4 f . 
        . . . . . . . . . f 4 e 4 f . . 
        . . . . . . . . f 4 e 4 f . . . 
        . . f f . . . f 4 e 4 f . . . . 
        . . f e f . f 4 e 4 f . . . . . 
        . . . f e f 4 e 4 f . . . . . . 
        . . . f e f e 4 f . . . . . . . 
        . . . . f e f f . . . . . . . . 
        . . . f e f e e f . . . . . . . 
        . . f 4 f . f f e f . . . . . . 
        f f e f . . . . f f . . . . . . 
        f e f . . . . . . . . . . . . . 
        f f f . . . . . . . . . . . . . 
        `, mySprite, 100, 0)
    animation.runImageAnimation(
    sword,
    [img`
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . . f 4 e f 
        . . . . . . . . . . . f 4 e 4 f 
        . . . . . . . . . . f 4 e 4 f . 
        . . . . . . . . . f 4 e 4 f . . 
        . . . . . . . . f 4 e 4 f . . . 
        . . f f . . . f 4 e 4 f . . . . 
        . . f e f . f 4 e 4 f . . . . . 
        . . . f e f 4 e 4 f . . . . . . 
        . . . f e f e 4 f . . . . . . . 
        . . . . f e f f . . . . . . . . 
        . . . f e f e e f . . . . . . . 
        . . f 4 f . f f e f . . . . . . 
        f f e f . . . . f f . . . . . . 
        f e f . . . . . . . . . . . . . 
        f f f . . . . . . . . . . . . . 
        `,img`
        f f f . . . . . . . . . . . . . 
        f e f . . . . . . . . . . . . . 
        f f e f . . . . f f . . . . . . 
        . . f 4 f . f f e f . . . . . . 
        . . . f e f e e f . . . . . . . 
        . . . . f e f f . . . . . . . . 
        . . . f e f e 4 f . . . . . . . 
        . . . f e f 4 e 4 f . . . . . . 
        . . f e f . f 4 e 4 f . . . . . 
        . . f f . . . f 4 e 4 f . . . . 
        . . . . . . . . f 4 e 4 f . . . 
        . . . . . . . . . f 4 e 4 f . . 
        . . . . . . . . . . f 4 e 4 f . 
        . . . . . . . . . . . f 4 e 4 f 
        . . . . . . . . . . . . f 4 e f 
        . . . . . . . . . . . . . f f f 
        `,img`
        . . . . . . . . . . . . . f f f 
        . . . . . . . . . . . . . f e f 
        . . . . . . f f . . . . f e f f 
        . . . . . . f e f f . f 4 f . . 
        . . . . . . . f e e f e f . . . 
        . . . . . . . . f f e f . . . . 
        . . . . . . . f 4 e f e f . . . 
        . . . . . . f 4 e 4 f e f . . . 
        . . . . . f 4 e 4 f . f e f . . 
        . . . . f 4 e 4 f . . . f f . . 
        . . . f 4 e 4 f . . . . . . . . 
        . . f 4 e 4 f . . . . . . . . . 
        . f 4 e 4 f . . . . . . . . . . 
        f 4 e 4 f . . . . . . . . . . . 
        f e 4 f . . . . . . . . . . . . 
        f f f . . . . . . . . . . . . . 
        `,img`
        f f f . . . . . . . . . . . . . 
        f e 4 f . . . . . . . . . . . . 
        f 4 e 4 f . . . . . . . . . . . 
        . f 4 e 4 f . . . . . . . . . . 
        . . f 4 e 4 f . . . . . . . . . 
        . . . f 4 e 4 f . . . . . . . . 
        . . . . f 4 e 4 f . . . f f . . 
        . . . . . f 4 e 4 f . f e f . . 
        . . . . . . f 4 e 4 f e f . . . 
        . . . . . . . f 4 e f e f . . . 
        . . . . . . . . f f e f . . . . 
        . . . . . . . f e e f e f . . . 
        . . . . . . f e f f . f 4 f . . 
        . . . . . . f f . . . . f e f f 
        . . . . . . . . . . . . . f e f 
        . . . . . . . . . . . . . f f f 
        `],
    200,
    true
    )
}
let sword: Sprite = null
let wolf: Sprite = null
let chest: Sprite = null
let mySprite: Sprite = null
sceneSetUp()
playerSetUp()
game.onUpdate(function () {
    wolf.ay = 500
    if (wolf.isHittingTile(CollisionDirection.Left) && wolf.isHittingTile(CollisionDirection.Bottom)) {
        wolf.vy = -150
    }
    if (wolf.isHittingTile(CollisionDirection.Right) && wolf.isHittingTile(CollisionDirection.Bottom)) {
        wolf.vy = -150
    }
    if (wolf.isHittingTile(CollisionDirection.Left)) {
        wolf.vx = randint(-80, -50)
        if (Math.percentChance(3)) {
            wolf.vx = randint(50, 80)
        }
    }
    if (wolf.isHittingTile(CollisionDirection.Right)) {
        wolf.vx = randint(50, 80)
        if (Math.percentChance(3)) {
            wolf.vx = randint(-80, -50)
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (Math.percentChance(50)) {
        wolf.vx = randint(50, 80)
    } else {
        wolf.vx = randint(-80, -50)
    }
})

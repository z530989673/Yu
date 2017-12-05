/*
* name;
*/
var CollisionManager = /** @class */ (function () {
    function CollisionManager(m) {
        this.isActive = true;
        this.map = m;
        Laya.timer.loop(50, this, this.Update);
    }
    CollisionManager.prototype.Update = function () {
        if (!this.isActive)
            return;
        var player = this.map.player;
        var characters = this.map.characters;
        var playerRect = player.GetRect();
        for (var i = 0; i < characters.length; i++) {
            if (!characters[i].enableCollision)
                continue;
            if (characters[i].Intersects(playerRect)) {
                EventCenter.dispatchAll(new GameEvent("playerCollision", [player, characters[i]], this));
                return;
            }
        }
    };
    return CollisionManager;
}());
//# sourceMappingURL=CollisionManager.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.ENotificationFromType = void 0;
var ENotificationFromType;
(function (ENotificationFromType) {
    ENotificationFromType["APP"] = "APP";
    ENotificationFromType["USER"] = "USER";
})(ENotificationFromType || (exports.ENotificationFromType = ENotificationFromType = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["MINTING"] = "MINTING";
    NotificationType["BIDDING"] = "BIDDING";
    NotificationType["LISTING"] = "LISTING";
    NotificationType["FOLLOW"] = "FOLLOW";
    NotificationType["SOLD"] = "SOLD";
    NotificationType["BOUGHT"] = "BOUGHT";
    NotificationType["REMOVE_BID"] = "REMOVE_BID";
    NotificationType["STAGE"] = "STAGE";
    NotificationType["REACTION"] = "REACTION";
    NotificationType["REPOST"] = "REPOST";
    NotificationType["COMMENT"] = "COMMENT";
    NotificationType["COMMENT_REPLY"] = "COMMENT_REPLY";
    NotificationType["MENTIONED"] = "MENTIONED";
    NotificationType["VOTE"] = "VOTE";
    NotificationType["LIKE"] = "LIKE";
    NotificationType["LIKE_COMMENT"] = "LIKE_COMMENT";
    NotificationType["HASHTAG"] = "HASHTAG";
    NotificationType["MESSAGE"] = "MESSAGE";
    NotificationType["FOLLOWER_POST"] = "FOLLOWER_POST";
    NotificationType["FOLLOWER_MINT"] = "FOLLOWER_MINT";
    NotificationType["FOLLOWER_CREATE_COLLECTION"] = "FOLLOWER_CREATE_COLLECTION";
    NotificationType["FOLLOWER_COMMENT"] = "FOLLOWER_COMMENT";
    NotificationType["FOLLOWER_REPOST"] = "FOLLOWER_REPOST";
    NotificationType["SYSTEM"] = "SYSTEM";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
//# sourceMappingURL=notifications.enum.js.map


var mylru = function(maxSize) {
	var msize = maxSize;
	var currSize = 0;

	var dict = {}
	var recentlyUsedList = []

	function updateList(key) {
		for(var i=0, len = recentlyUsedList.length; i < len; i++) {
			if(recentlyUsedList[i] === key) {
				recentlyUsedList.splice(i,1);
				break;
			}
		}

		recentlyUsedList.push(key);
	}

	return {
		get: function(key) {
			var value = null;

			if(key in dict) {
				value = dict[key];
				updateList(key);
			}

			return value;
		},
		set: function(key, value) {
			if(key in dict) {
				dict[key] = value;
				updateList(key);
				return;
			}

			// new key
			if(currSize < maxSize) {		
				currSize++;
			}
			// need to remove some key from the lru
			else {
				var keyToRemove = recentlyUsedList[0];
				recentlyUsedList.shift();
				delete dict[keyToRemove];
			}

			dict[key] = value;
			updateList(key);
		},
		clear: function() {
			dict = {};
			recentlyUsedList = [];
			currSize = 0;

			return;
		}
	};
};

var lru = mylru(3);
lru.set("A",1);
lru.set("B",2);
lru.set("C",3);
lru.get("A");
lru.set("D",4);

console.log(lru.get("A"));

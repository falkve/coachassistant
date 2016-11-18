var Search = function (searchbox_id, container_id, filter_class, enter_action) {
    var container = document.getElementById(container_id);
    var children = container.getElementsByTagName("li");
    
	function get_sibling(mode, node) {
		if(mode === 'next') {
			var el = node.nextElementSibling;
		}
		else {
			var el = node.previousElementSibling;
		}

		if( el.className.indexOf("visible") == -1 ) {
			return get_sibling(mode, el);
		}

		return el;
	}
	console.log( children );
    // Loop through the children adding a visible class
    for (var i = 0; i < children.length; ++i) {
        children[i].className += " visible";
        
        
    }
	
    //children[children.length - 1].className += " last";

    // Key down events for 'controls' such as up/down/enter
    document.getElementById(searchbox_id).onkeydown = function (e) {
        // Up / Down keys
        if (e.keyCode == 38 || e.keyCode == 40) {
            e.preventDefault();

            // If there is already an .active row, then lets move on to the next/previous item in the list
            if (typeof container.getElementsByClassName("active")[0] != 'undefined') {
                var row = container.getElementsByClassName("active")[0];

                try {
                    // up
                    if (e.keyCode == 38) {
                       var sibling = get_sibling('previous', row);
                    }
                    // down
                    else {
                        var sibling = get_sibling('next', row);
                    }

                    // move focus to the sibling element
                    sibling.className += ' active';
                    container.scrollTop = sibling.offsetTop;
                } catch (e) {
                    // Do nothing
                    console.log(e);
                }

                // Remove the active class from the original active row
                row.className = row.className.replace(/active/g, "");
                return;
            }
            // UP - Focus on the last item in the list
            else if (e.keyCode == 38) {
                var rows = container.getElementsByClassName("visible");
                rows[rows.length - 1].className += " active";
                container.scrollTop = rows[rows.length - 1].offsetTop;
            }
            // DOWN - focus on the first item in the list
            else if (e.keyCode == 40) {
                container.getElementsByClassName("visible")[0].className += " active";
                container.scrollTop = 0;
            }

            return;
        }

        // Enter
        if (e.keyCode == 13 && typeof enter_action == 'function') {
            e.preventDefault();
            try {
                enter_action(container.getElementsByClassName("active")[0]);
            } catch (e) {
                // Do nothing
            }
            return;
        }
    };

    // Keyup event to actually do the 'searching' and update the list accordingly
    document.getElementById(searchbox_id).onkeyup = function (e) {
        // Don't do anything on these
        if (e.keyCode == 9 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13) {
            e.preventDefault();
            return;
        }

        // Remove the 'no results' class from the search box first
        this.className = this.className.replace(/search--no-results/g, "");

        // Convert the value to lower case for a 'case insensitive' search
        var value = this.value.toLowerCase();

        // Count how many rows are visible
        var visible = 0;

        // Loop through all the <li> tags in the container
        for (var i = 0; i < children.length; ++i) {
            // Remove these class names first
            children[i].className = children[i].className.replace(/visible/g, "").replace(/last/g, "");

            // If the filter element contains the keyword, then set it as visible
            if (children[i].getElementsByClassName(filter_class)[0].innerHTML.toLowerCase().indexOf(value) != -1) {
                children[i].className += " visible";
                ++visible;
            }
            // Other wise, make sure to remove the 'active' class
            else {
                children[i].className = children[i].className.replace(/active/g, "");
            }
        }

        // No visible items, so add a class to the search box
        if (visible === 0) {
            this.className += ' search--no-results';
        }
        // Otherwise add a 'last' class to the list for styling
        else {
            container.getElementsByClassName("visible")[visible - 1].className += " last";
        }
    };
};

simpleCalendar is a jQuery &amp; CSS3 data calendar

#### [Click here to see the demo](http://w3tl.github.io/simpleCalendar/)

## How to install:


1. Download simpleCalendar 

2. Included jQuery library (example):
	
	```html
	<script src="http://code.jquery.com/jquery-latest.js"></script>
	```

3. Insert the following code before end of ```</head>``` tag:
	
	```html
	<!-- simpleCalendar CSS file -->
    <link rel="stylesheet" href="path/to/simpleCalendar.css">
	<!-- simpleCalendar js file -->
	<script type="text/javascript" src="path/to/simpleCalendar.js"></script>
	```

4. Insert the following code after the ```<body>``` tag:

	```html
 	<div id="calendar" class="calendar-main"></div>
	```
	where **data-full** - *path to original image*
5. Now you need to call the plugin with your calendar div ID-attribute (#calendar).

    ```javascript
    $(document).ready(function(){
			$('#calendar').calendar();
	});
    ```
Additional plug-in call options:
<table cellspacing="0" style="text-align: center; padding: 5px">
	<tr>
		<th>Key</th>
		<th>Default</th>
		<th>Values</th>
		<th>Description</th>
	</tr>
	<tr>
		<td><code>view</code></td>
		<td><code>days</code></td>
		<td><code>days, months, years</code></td>
		<td>Calendar view by default</td>
	</tr>
</table>
Example:
	```javascript
    $(document).ready(function(){
			$('#calendar').calendar({view: 'months'});
	});
    ```

 ### Done!

License
------

This project is licensed under the [MIT license](http://opensource.org/licenses/MIT).


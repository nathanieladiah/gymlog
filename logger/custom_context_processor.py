from datetime import datetime 

def journal_link_renderer(request):
	now = datetime.now()
	current_month = now.strftime("%m")
	current_year = now.strftime("%Y")
	current_day = now.strftime("%d")
	return {
		'current_month': current_month,
		'current_year': current_year,
		'current_day': current_day
	}
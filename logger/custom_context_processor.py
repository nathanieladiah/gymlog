from datetime import datetime 

def journal_link_renderer(request):
	now = datetime.now()
	current_month = now.strftime("%b")
	current_year = now.strftime("%Y")
	return {
		'current_month': current_month,
		'current_year': current_year
	}


.PHONY: release-npmjs
release-js:
	npm login
	npm publish


.PHONY: release-pypi
release-pypi:
	rm -f dist/*
	python setup.py sdist
	twine upload dist/*

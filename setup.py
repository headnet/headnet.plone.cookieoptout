from setuptools import setup, find_packages
import sys, os

version = '0.1'

setup(name='headnet.plone.cookieoptout',
      version=version,
      description="package for cookie optout",
      long_description="package for for cookie optout",
      classifiers=["Framework :: Plone",
        "Programming Language :: Python",
      ],
      keywords='cookie optout',
      author='Mustapha Benali',
      author_email='mustapha@headnet.dk',
      url='',
      license='',
      namespace_packages=['headnet', 'headnet.plone'],
      packages=find_packages(exclude=['ez_setup', 'examples', 'tests']),
      include_package_data=True,
      zip_safe=True,
      install_requires=[
          'Plone',
          # -*- Extra requirements: -*-
      ],
      entry_points="""
      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
